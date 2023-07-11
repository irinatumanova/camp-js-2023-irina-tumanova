import { Publisher } from './Publisher';
import { winningPoints } from './const';
import { IDisplayStatusData, IMoveData, ISubscriber, TDisplayStatus } from './types';

/** Player result class. */
export class PlayerStatus extends Publisher<IDisplayStatusData> implements ISubscriber<IMoveData> {

	/** Players count. */
	private results: number[] = [];

	public constructor(public readonly playerId: number) {
		super();
	}

	/**
	 * FUpdate data.
	 * @param data - Game move data.
	 */
	public update(data: IMoveData): void {
		let score = this.results.reduce((prev, next) => prev + next, 0);
		if (data.currentPlayerId === this.playerId) {
			score += data.diceSide;
			this.results = [...this.results, data.diceSide];
		}

		const notifyData: IDisplayStatusData = {
			status: this.getPlayerStatus(score, data.nextPlayerId === this.playerId),
			results: this.playerId === data.currentPlayerId ?
				this.results :
				undefined,
		};

		this.notify(notifyData);
	}

	/**
	 * Get player status.
	 * @param isActive - Is the user active (walking now).
	 * @param score - Player score.
	 */
	public getPlayerStatus(score: number, isActive: boolean): TDisplayStatus[] {
		const status: TDisplayStatus[] = [];
		if (score >= winningPoints) {
			status.push(TDisplayStatus.Win);
		}

		if (isActive) {
			status.push(TDisplayStatus.Active);
		}

		return status;
	}
}
