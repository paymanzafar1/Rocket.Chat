import type { ILivechatTag } from '@rocket.chat/core-typings';
import { Callout } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';

import TagEdit from './TagEdit';
import TagEditWithDepartmentData from './TagEditWithDepartmentData';
import { ContextualbarSkeleton } from '../../components/Contextualbar';

const TagEditWithData = ({ tagId }: { tagId: ILivechatTag['_id'] }) => {
	const { t } = useTranslation();

	const getTagById = useEndpoint('GET', '/v1/livechat/tags/:tagId', { tagId });
	const { data, isLoading, isError } = useQuery(['livechat-getTagById', tagId], async () => getTagById(), { refetchOnWindowFocus: false });

	if (isLoading) {
		return <ContextualbarSkeleton />;
	}

	if (isError) {
		return (
			<Callout m={16} type='danger'>
				{t('Not_Available')}
			</Callout>
		);
	}

	if (data?.departments && data.departments.length > 0) {
		return <TagEditWithDepartmentData tagData={data} />;
	}

	return <TagEdit tagData={data} />;
};

export default TagEditWithData;
