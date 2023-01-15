export default class ApplicationError extends Error {
	public code: number;

	constructor(code: number, name: string, message: string) {
		super(message);

		this.code = code;
		this.name = name;
	}
}
