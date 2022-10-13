import random
from typing import Optional
from players.abstract_player import AbstractPlayer
from game.board import Board


class TicTacToe:
    def __init__(self, p1: AbstractPlayer, p2: AbstractPlayer) -> None:
        self.board = Board()
        self.p1 = p1
        self.p2 = p2
        self.p_turn = random.choice([p1 , p2])

    def make_move(self) -> None:
        position = self.p_turn.get_next_move(self.board)
        while not self.board.place_value(position, self.p_turn.board_value):
            print("Position invalid!")
            position = self.p_turn.get_next_move(self.board)        
        
        self.p_turn = self.p2 if self.p_turn == self.p1 else self.p1

    def check_winner(self) -> Optional[int]:
        winner = self.board.get_winner()
        if winner == self.p1.board_value:
            return 1

        if winner == self.p2.board_value:
            return 2

        if self.board.is_full():
            return 0