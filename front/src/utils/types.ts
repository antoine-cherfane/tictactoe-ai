type Player = "Human" | "Minimax" | "Expectimax" | null;

interface InitGameDto {
    p1: Player,
    p2: Player
}

interface InitParamsDto {
    board_size: number,
    empty_value: string
}

interface MakeMoveDto {
    position: number
}

interface GameStatusDto {
    board: string[],
    status: string | null,
    result?: number,
    turn?: string,
    p1?: string,
    p2?: string
}