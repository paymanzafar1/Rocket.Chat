import type { LicenseModule } from '@rocket.chat/core-typings';

import { useLicenseBase } from './useLicense';

export const useHasLicenseModule = (licenseName: LicenseModule): 'loading' | boolean => {
	if (licenseName=='canned-responses' || licenseName=='videoconference-enterprise' || licenseName=='voip-enterprise' || licenseName=='auditing' || licenseName=='livechat-enterprise' || licenseName=='federation' || licenseName=='device-management' || licenseName=='engagement-dashboard' || licenseName=='custom-roles') return true;
	return (
		useLicenseBase({
			select: (data) => data.license.activeModules.includes(licenseName),
		}).data ?? 'loading'
	);
};
