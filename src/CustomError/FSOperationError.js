export class FSOperationError extends Error {
	constructor(customErrorMessage) {
		super('FS operation failed! 🕵️');
		this.customErrorMessage = customErrorMessage || 'FS operation failed! 🕵️';
		this.name = 'FSOperationError';
	}
}
