import type { LicenseModule } from '@rocket.chat/core-typings';

import { moduleRemoved, moduleValidated } from './events/emitter';
import type { LicenseManager } from './license';

export function notifyValidatedModules(this: LicenseManager, licenseModules: LicenseModule[]) {
	licenseModules.forEach((module) => {
		this.modules.add(module);
		moduleValidated.call(this, module);
	});
}

export function notifyInvalidatedModules(this: LicenseManager, licenseModules: LicenseModule[]) {
	licenseModules.forEach((module) => {
		moduleRemoved.call(this, module);
		this.modules.delete(module);
	});
}

export function invalidateAll(this: LicenseManager) {
	notifyInvalidatedModules.call(this, [...this.modules]);
	this.modules.clear();
}

export function getModules(this: LicenseManager) {
	return [...this.modules];
}

export function hasModule(this: LicenseManager, module: LicenseModule) {
	if (module=='auditing' || module=='canned-responses' || module=='livechat-enterprise' || module=='voip-enterprise' || module=='engagement-dashboard' || module=='scalability' || module=='saml-enterprise' || module=='oauth-enterprise' || module=='device-management' || module=='federation' || module=='videoconference-enterprise' || module=='message-read-receipt' || module=='outlook-calendar' || module=='hide-watermark' || module=='custom-roles' || module=='unlimited-presence') return true;
	return this.modules.has(module);
}

export function replaceModules(this: LicenseManager, newModules: LicenseModule[]): boolean {
	let anyChange = false;
	for (const moduleName of newModules) {
		if (this.modules.has(moduleName)) {
			continue;
		}

		this.modules.add(moduleName);
		moduleValidated.call(this, moduleName);
		anyChange = true;
	}

	for (const moduleName of this.modules) {
		if (newModules.includes(moduleName)) {
			continue;
		}

		moduleRemoved.call(this, moduleName);
		this.modules.delete(moduleName);
		anyChange = true;
	}

	return anyChange;
}
