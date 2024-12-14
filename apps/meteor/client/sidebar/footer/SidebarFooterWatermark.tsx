import { Box } from '@rocket.chat/fuselage';
import { useTranslation } from '@rocket.chat/ui-contexts';
import type { ReactElement } from 'react';
import React from 'react';

import { useLicense, useLicenseName } from '../../hooks/useLicense';

export const SidebarFooterWatermark = (): ReactElement | null => {
	const t = useTranslation();

	const response = useLicense();

	const licenseName = useLicenseName();

	if (response.isLoading || response.isError) {
		return null;
	}

	if (licenseName.isError || licenseName.isLoading) {
		return null;
	}

	const license = response.data;

	if (license.activeModules.includes('hide-watermark') && !license.trial) {
		return null;
	}

	return null;
};
