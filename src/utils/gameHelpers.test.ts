/* eslint-disable import/named */
import type { Board, Move, Player } from '@interfaces/game'
import { describe, expect, test } from 'vitest'

import {
	calculateIsPlayable as isPlayable,
	calculateIsWinner as isWinner,
	updateBoard,
} from './gameHelpers'

describe('calculateIsPlayable', () => {
	test('move is playable', async () => {
		const board: Board = [
			['', '', ''],
			['', '', ''],
			['', '', ''],
		]
		const move: Move = { index: 1, player: 'X' }

		const result = await isPlayable(board, move)

		expect(result).toBeTruthy()
	})
	test('move is not playable', async () => {
		const board: Board = [
			['', 'X', ''],
			['', '', ''],
			['', '', ''],
		]
		const move: Move = { index: 1, player: 'X' }

		const result = await isPlayable(board, move)

		expect(result).toBeFalsy()
	})
})

describe('calculateIsWinner', () => {
	test('no win', () => {
		const board: Board = [
			['', '', ''],
			['', '', ''],
			['', '', ''],
		]
		const player: Player = 'X'
		expect(isWinner(board, player)).toBeFalsy()
	})
	test('wins by row 1', () => {
		const player: Player = 'X'
		const board: Board = [
			[player, player, player],
			['', '', ''],
			['', '', ''],
		]
		expect(isWinner(board, player)).toBeTruthy()
	})
	test('wins by row 2', () => {
		const player: Player = 'X'
		const board: Board = [
			['', '', ''],
			[player, player, player],
			['', '', ''],
		]
		expect(isWinner(board, player)).toBeTruthy()
	})
	test('wins by row 3', () => {
		const player: Player = 'X'
		const board: Board = [
			['', '', ''],
			['', '', ''],
			[player, player, player],
		]
		expect(isWinner(board, player)).toBeTruthy()
	})
	test('wins by col 1', () => {
		const player: Player = 'X'
		const board: Board = [
			[player, '', ''],
			[player, '', ''],
			[player, '', ''],
		]
		expect(isWinner(board, player)).toBeTruthy()
	})
	test('wins by col 2', () => {
		const player: Player = 'X'
		const board: Board = [
			['', player, ''],
			['', player, ''],
			['', player, ''],
		]
		expect(isWinner(board, player)).toBeTruthy()
	})
	test('wins by col 3', () => {
		const player: Player = 'X'
		const board: Board = [
			['', '', player],
			['', '', player],
			['', '', player],
		]
		expect(isWinner(board, player)).toBeTruthy()
	})
	test('wins by diag 1', () => {
		const player: Player = 'X'
		const board: Board = [
			[player, '', ''],
			['', player, ''],
			['', '', player],
		]
		expect(isWinner(board, player)).toBeTruthy()
	})
	test('wins by diag 2', () => {
		const player: Player = 'X'
		const board: Board = [
			['', '', player],
			['', player, ''],
			[player, '', ''],
		]
		expect(isWinner(board, player)).toBeTruthy()
	})
})

describe('updateBoard', () => {
	test('', () => {
		let board: Board = [
			['', '', ''],
			['', '', ''],
			['', '', ''],
		]
		let move: Move = { index: 0, player: 'X' }

		board = updateBoard(board, move)
		expect(board.flat()[move.index]).toEqual(move.player)
		move = { index: 5, player: 'O' }
		board = updateBoard(board, move)
		expect(board.flat()[move.index]).toEqual(move.player)
		move = { index: 6, player: 'X' }
		board = updateBoard(board, move)
		expect(board.flat()[move.index]).toEqual(move.player)
		move = { index: 8, player: 'O' }
		board = updateBoard(board, move)
		expect(board.flat()[move.index]).toEqual(move.player)
	})
})
