//@ts-nocheck
export interface IBody {
    id: number;
    position: [number, number];
    dimensions: [number, number];
    _cells: {
        min: null | number[];
        max: null | number[];
        nodes: null | LLNode[];
    };
    _queryId: number;
}

interface LLNode {
    next: null | LLNode;
    prev: null | LLNode;
    client: IBody;
}

export default class SpatialHash {
    private _cells: Array<Array<null | LLNode>>;
    private _dimensions: [number, number];
    private _bounds: [[number, number], [number, number]];
    private _queryIds: number;

    constructor(bounds: [[number, number], [number, number]], dimensions: [number, number]) {
        const x = dimensions[0];
        const y = dimensions[1];
        this._cells = [...Array(x)].map(_ => [...Array(y)].map(_ => null));
        this._dimensions = dimensions;
        this._bounds = bounds;
        this._queryIds = 0;
    }

    private _GetCellIndex(position: [number, number]) {
        const x = Math.min(Math.max((position[0] - this._bounds[0][0]) / (this._bounds[1][0] - this._bounds[0][0]), 0.0), 1.0);
        const y = Math.min(Math.max((position[1] - this._bounds[0][1]) / (this._bounds[1][1] - this._bounds[0][1]), 0.0), 1.0);

        const xIndex = Math.floor(x * (this._dimensions[0] - 1));
        const yIndex = Math.floor(y * (this._dimensions[1] - 1));

        return [xIndex, yIndex];
    }

    add(entityID: number, position: [number, number], dimensions: [number, number]): IBody {
        const client: IBody = {
            id: entityID,
            position: position,
            dimensions: dimensions,
            _cells: {
                min: null,
                max: null,
                nodes: null,
            },
            _queryId: -1,
        };

        this._Insert(client);

        return client;
    }
    update(client: IBody) {
        const x = client.position[0];
        const y = client.position[1];
        const w = client.dimensions[0];
        const h = client.dimensions[1];

        const i1 = this._GetCellIndex([x - w / 2, y - h / 2]);
        const i2 = this._GetCellIndex([x + w / 2, y + h / 2]);

        if (client._cells.min[0] == i1[0] && client._cells.min[1] == i1[1] && client._cells.max[0] == i2[0] && client._cells.max[1] == i2[1]) {
            return;
        }

        this.remove(client);
        this._Insert(client);
    }

    retrieve(position: [number, number], bounds: [number, number]): IBody[] {
        const x = position[0];
        const y = position[1];
        const w = bounds[0];
        const h = bounds[1];

        const i1 = this._GetCellIndex([x - w / 2, y - h / 2]);
        const i2 = this._GetCellIndex([x + w / 2, y + h / 2]);

        const clients = [];
        const queryId = this._queryIds++;

        for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
            for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
                let head = this._cells[x][y];

                while (head) {
                    const v = head.client;
                    head = head.next;

                    if (v._queryId != queryId) {
                        v._queryId = queryId;
                        clients.push(v);
                    }
                }
            }
        }
        return clients;
    }

    private _Insert(client: IBody) {
        const x = client.position[0];
        const y = client.position[1];
        const w = client.dimensions[0];
        const h = client.dimensions[1];

        const i1 = this._GetCellIndex([x - w / 2, y - h / 2]);
        const i2 = this._GetCellIndex([x + w / 2, y + h / 2]);

        const nodes = [];

        for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
            nodes.push([]);

            for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
                const xi = x - i1[0];

                const head = {
                    next: null,
                    prev: null,
                    client: client,
                };

                nodes[xi].push(head);

                head.next = this._cells[x][y];
                if (this._cells[x][y]) {
                    this._cells[x][y].prev = head;
                }

                this._cells[x][y] = head;
            }
        }

        client._cells.min = i1;
        client._cells.max = i2;
        client._cells.nodes = nodes;
    }

    remove(client: IBody) {
        const i1 = client._cells.min;
        const i2 = client._cells.max;

        for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
            for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
                const xi = x - i1[0];
                const yi = y - i1[1];
                const node = client._cells.nodes[xi][yi];

                if (node.next) {
                    node.next.prev = node.prev;
                }
                if (node.prev) {
                    node.prev.next = node.next;
                }

                if (!node.prev) {
                    this._cells[x][y] = node.next;
                }
            }
        }

        client._cells.min = null;
        client._cells.max = null;
        client._cells.nodes = null;
    }
}
