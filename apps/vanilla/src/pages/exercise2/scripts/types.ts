/** Interface for subscribers. */
export interface ISubscriber<T>{

	/** Update subscriber. */
	readonly update: (message: T) => void;
}

/** Data about who is turn. */
export interface CurrentTurnOrder {

	/** Current player's index. */
	readonly currentPlayerIndex: number;

	/** Next player's index. */
	readonly nextPlayerIndex: number;
}

/** Data about a turn. */
export interface TurnResult extends CurrentTurnOrder {

	/** Number on the dice. */
	readonly diceResult: number;
}

/** Data to display the result. */
export interface TurnResultsForDisplay {

	/** Turn's values. */
	readonly turnResults: readonly number[];

	/** Player is active. */
	readonly isActive?: boolean;

	/** Player is a winner. */
	readonly isWinner?: boolean;
}

/** Player status. */
export enum PlayerStatus {
	Active = 'result-item_active',
	Win = 'result-item_winning',
}

/** Message with only results. */
export interface ResultsMessage{

	/** Turns results. */
	results: number[];
}

/** Message with only activity status. */
export interface IsActiveMessage{

	/** Player is active. */
	isActive: boolean;
}

/** Message with only with winning status. */
export interface IsWinnerMessage{

	/** Player is winner. */
	isWinner: boolean;
}
