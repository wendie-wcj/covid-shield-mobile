import React, {useCallback} from 'react';
import {Text, ButtonMultiline} from 'components';
import {useI18n} from '@shopify/react-i18n';

import {BaseHomeView} from '../components/BaseHomeView';
import {useNavigation} from '@react-navigation/native';

export const NoExposureUncoveredRegionView = () => {
  const [i18n] = useI18n();
  const navigation = useNavigation();
  const onDiagnosed = useCallback(() => navigation.navigate('DataSharing'), [navigation]);

  return (
    // note you can add an icon i.e. <BaseHomeView iconName="icon-offline>
    <BaseHomeView>
      <Text variant="bodyTitle" color="bodyText" marginBottom="l" accessibilityRole="header">
        {i18n.translate('Home.NoExposureDetected.RegionNotCovered.Title')}
      </Text>
      <Text variant="bodyText" color="bodyText" marginBottom="l">
        {i18n.translate('Home.NoExposureDetected.RegionNotCovered.Body')}
      </Text>
      <ButtonMultiline
        text={i18n.translate('Home.NoExposureDetected.RegionNotCovered.DiagnosedBtnText1')}
        text1={i18n.translate('Home.NoExposureDetected.RegionNotCovered.DiagnosedBtnText2')}
        variant="bigFlat"
        internalLink
        onPress={onDiagnosed}
      />
    </BaseHomeView>
  );
};
