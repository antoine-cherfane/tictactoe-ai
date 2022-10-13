from players.abstract_player import AbstractPlayer
from game.board import Board
import utils.enums as enums


class ExpectimaxPlayer(AbstractPlayer):
    def __init__(self, board_value: enums.BoardValue):
        super().__init__(board_value)
        self.other_board_value = enums.BoardValue.X if self.board_value == enums.BoardValue.O else enums.BoardValue.O 

    def get_next_move(self, board: Board) -> int:
        return 0
