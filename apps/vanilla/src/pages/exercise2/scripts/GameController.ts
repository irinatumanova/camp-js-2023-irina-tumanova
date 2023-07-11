import { DiceGenerator } from './DiceGenerator';
import { MoveGenerator } from './MoveGenerator';
import { GameStatus } from './GameStatus';
import { UIScoreDisplayer } from './UIScoreDisplayer';
import { PlayerStatus } from './PlayerStatus';

/** Game controller. */
export class GameController {

	private moveGenerator: MoveGenerator;

	private diceGenerator: DiceGenerator;

	private playerIds: number[] = [];

	private lastPlayerId = 0;

	public constructor() {
		this.moveGenerator = new MoveGenerator();
		this.diceGenerator = new DiceGenerator();

		this.addGameStatus();
		this.addPlayerStatus('Computer');
		this.addPlayerStatus('You');

		this.moveGenerator.subscribe(this.diceGenerator);

		this.listenMove();
	}

	/** Function add player.
	 * @param playerName - Player's name for display.
	 */
	public addPlayerStatus(playerName: string): void {
		this.lastPlayerId += 1;
		this.playerIds = [...this.playerIds, this.lastPlayerId];
		const player = new PlayerStatus(this.lastPlayerId);
		const uiPlayerDisplayer = new UIScoreDisplayer(playerName);
		player.subscribe(uiPlayerDisplayer);

		this.diceGenerator.subscribe(player);
		this.moveGenerator.updatePlayers(this.playerIds);
	}

	/** Function add game result. */
	public addGameStatus(): void {
		const game = new GameStatus();
		const uiGameScoreDisplayer = new UIScoreDisplayer('Dice');
		game.subscribe(uiGameScoreDisplayer);

		this.diceGenerator.subscribe(game);
	}

	/** Function listen click on turn button. */
	public listenMove(): void {
		document.querySelector('.blackjack__turn_button')?.addEventListener('click', this.moveGenerator.move);
	}
}
