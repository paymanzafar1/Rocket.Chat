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
	this.modules.add('auditing');
	this.modules.add('canned-responses');
	this.modules.add('ldap-enterprise');
	this.modules.add('livechat-enterprise');
	this.modules.add('voip-enterprise');
	this.modules.add('omnichannel-mobile-enterprise');
	this.modules.add('engagement-dashboard');
	this.modules.add('push-privacy');
	this.modules.add('scalability');
	this.modules.add('teams-mention');
	this.modules.add('saml-enterprise');
	this.modules.add('oauth-enterprise');
	this.modules.add('device-management');
	this.modules.add('federation');
	this.modules.add('videoconference-enterprise');
	this.modules.add('message-read-receipt');
	this.modules.add('outlook-calendar');
	this.modules.add('hide-watermark');
	this.modules.add('custom-roles');
	this.modules.add('accessibility-certification');
	this.modules.add('unlimited-presence');
	this.modules.add('contact-id-verification');
	this.modules.add('teams-voip');

	return [...this.modules];
}

export function hasModule(this: LicenseManager, module: LicenseModule) {
	return true;
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
