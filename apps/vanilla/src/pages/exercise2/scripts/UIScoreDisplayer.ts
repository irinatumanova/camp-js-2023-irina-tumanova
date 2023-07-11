import { IDisplayResultData, ISubscriber, TDisplayPlayerStatus } from './types';

/** Result block display class. */
export class UIScoreDisplayer implements ISubscriber<IDisplayResultData> {
	private resultHtml: HTMLDivElement | null = null;

	private resultMovesHtml: HTMLDivElement | null = null;

	private resultScoreHtml: HTMLParagraphElement | null = null;

	public constructor(scoreName: string) {
		const containerHtml = document.querySelector('.blackjack__results');

		if (containerHtml === null) {
			return;
		}

		this.createElement(containerHtml, scoreName);
	}

	/** Function update data.
	 * @param data - Game move data.
	 */
	public update(data: IDisplayResultData): void {
		if (this.resultHtml === null || this.resultMovesHtml === null || this.resultScoreHtml === null) {
			return;
		}

		this.resultHtml.classList.remove(TDisplayPlayerStatus.Active);
		this.resultHtml.classList.add(data.status);

		if (data.results === undefined) {
			return;
		}
		const diceSideHtml = document.createElement('p');
		diceSideHtml.innerText = `${data.results[data.results.length - 1]}`;
		this.resultMovesHtml.appendChild(diceSideHtml);
		this.resultScoreHtml.textContent = data.results.reduce((prev, next) => prev + next, 0).toString();
	}

	/** Function result block creation .
	 * @param parent - Parent element.
	 * @param name - Result name.
	 */
	public createElement(parent: Element, name: string): void {
		const resultHtml = document.createElement('div');
		resultHtml.className = 'blackjack__result-item result-item';

		const resultNameHtml = document.createElement('p');
		resultNameHtml.className = 'result-item__name';
		resultNameHtml.textContent = `${name} -`;

		const resultScoreHtml = document.createElement('p');
		resultScoreHtml.className = 'result-item__score';
		resultScoreHtml.textContent = '0';

		const resultMovesHtml = document.createElement('div');
		resultMovesHtml.className = 'result-item__moves';

		resultHtml.appendChild(resultNameHtml);
		resultHtml.appendChild(resultScoreHtml);
		resultHtml.appendChild(resultMovesHtml);

		parent.appendChild(resultHtml);

		this.resultHtml = resultHtml;
		this.resultMovesHtml = resultMovesHtml;
		this.resultScoreHtml = resultScoreHtml;
	}
}
