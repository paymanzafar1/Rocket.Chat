import type { LicenseModule } from '@rocket.chat/core-typings';

import { useLicenseBase } from './useLicense';

export const useHasLicenseModule = (licenseName: LicenseModule): 'loading' | boolean => {
	if (licenseName=='auditing' || licenseName=='canned-responses' || licenseName=='livechat-enterprise' || licenseName=='voip-enterprise' || licenseName=='engagement-dashboard' || licenseName=='scalability' || licenseName=='saml-enterprise' || licenseName=='oauth-enterprise' || licenseName=='device-management' || licenseName=='federation' || licenseName=='videoconference-enterprise' || licenseName=='message-read-receipt' || licenseName=='outlook-calendar' || licenseName=='hide-watermark' || licenseName=='custom-roles' || licenseName=='unlimited-presence') return true;
	return (
		useLicenseBase({
			select: (data) => data.license.activeModules.includes(licenseName),
		}).data ?? 'loading'
	);
};
