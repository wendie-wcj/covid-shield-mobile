import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Linking} from 'react-native';
import {useI18n} from '@shopify/react-i18n';
import {Text, Box, ButtonSingleLine} from 'components';
import {useStorage} from 'services/StorageService';

import {BaseHomeView} from '../components/BaseHomeView';

export const ExposureView = () => {
  const {region} = useStorage();
  const [i18n] = useI18n();
  const navigation = useNavigation();
  const getGuidanceURL = useCallback(() => {
    if (region !== undefined && region !== 'None') {
      return i18n.translate(`RegionalGuidance.${region}.URL`);
    }
    return i18n.translate(`RegionalGuidance.CA.URL`);
  }, [i18n, region]);

  const getGuidanceCTA = useCallback(() => {
    if (region !== undefined && region !== 'None') {
      return i18n.translate(`RegionalGuidance.${region}.CTA`);
    }
    return i18n.translate(`RegionalGuidance.CA.CTA`);
  }, [i18n, region]);

  const onActionGuidance = useCallback(() => {
    Linking.openURL(getGuidanceURL()).catch(err => console.error('An error occurred', err));
  }, [getGuidanceURL]);
  const onHowToIsolate = useCallback(() => navigation.navigate('HowToIsolate'), [navigation]);

  return (
    <BaseHomeView iconName="hand-caution">
      <Text variant="bodyTitle" marginBottom="m" accessibilityRole="header">
        {i18n.translate('Home.ExposureDetected.Title')}
      </Text>
      <Text marginBottom="m">{i18n.translate('Home.ExposureDetected.Body1')}</Text>
      <Text variant="bodyTitle" marginBottom="m" accessibilityRole="header">
        {i18n.translate('Home.ExposureDetected.Title2')}
      </Text>
      <Text>
        <Text>{i18n.translate('Home.ExposureDetected.Body2')}</Text>
        <Text fontWeight="bold">{i18n.translate('Home.ExposureDetected.Body3')}</Text>
      </Text>

      <Box alignSelf="stretch" marginTop="l" marginBottom="m">
        <ButtonSingleLine text={getGuidanceCTA()} variant="bigFlatPurple" externalLink onPress={onActionGuidance} />
      </Box>
      <Box alignSelf="stretch" marginBottom="xl">
        <ButtonSingleLine
          text={i18n.translate('Home.ExposureDetected.HowToIsolateCTA')}
          variant="bigFlatDarkGrey"
          onPress={onHowToIsolate}
          internalLink
        />
      </Box>
    </BaseHomeView>
  );
};
