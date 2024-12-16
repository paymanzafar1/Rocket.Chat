import type { LicenseModule } from '@rocket.chat/core-typings';

import { useLicenseBase } from './useLicense';

export const useHasLicenseModule = (licenseName: LicenseModule): 'loading' | boolean => {
	if (licenseName=='auditing' || licenseName=='canned-responses' || licenseName=='livechat-enterprise' || licenseName=='engagement-dashboard' || licenseName=='device-management' || licenseName=='message-read-receipt' || licenseName=='hide-watermark') return true;
	return (
		useLicenseBase({
			select: (data) => data.license.activeModules.includes(licenseName),
		}).data ?? 'loading'
	);
};
