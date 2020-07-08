import React, {useCallback, useEffect, useRef} from 'react';
import {ScrollView, StyleSheet, AccessibilityInfo, findNodeHandle, View, Alert} from 'react-native';
import {Box, Text, OnboardingHeader} from 'components';
import {useI18n} from '@shopify/react-i18n';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {NextButton, StepText} from '../components';

export const Start = () => {
  const [i18n] = useI18n();
  const navigation = useNavigation();
  const headerRef = useRef(null);
  const HeaderText = React.forwardRef((_, ref: React.Ref<View>) => {
    return (
      <View accessible ref={ref}>
        <Text variant="bodyText" color="overlayBodyText">
          {i18n.translate('Onboarding.Start.Body1')}
        </Text>
      </View>
    );
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AccessibilityInfo.isScreenReaderEnabled().then(enabled => {
        if (enabled) {
          const tag = findNodeHandle(headerRef.current);
          if (tag) AccessibilityInfo.setAccessibilityFocus(tag);
        }
      });
    });
    return unsubscribe;
  }, [navigation]);

  const onNext = useCallback(() => navigation.navigate('OnboardingAnonymous'), [navigation]);

  return (
    <Box flex={1} backgroundColor="overlayBackground">
      <SafeAreaView style={styles.flex}>
        <Box style={styles.spacer} />
        <Box flex={1} justifyContent="center">
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            <Box flex={1} paddingHorizontal="m">
              <OnboardingHeader
                text={i18n.translate('Onboarding.Start.Title')}
                imageSrc={require('assets/onboarding-start.png')}
                accessible
                accessibilityLabel={i18n.translate('Onboarding.Start.ImageAltText')}
              />
              <Box marginBottom="m">
                <HeaderText ref={headerRef} />
              </Box>
              <Box marginBottom="m">
                <Text variant="bodyText" color="overlayBodyText">
                  {i18n.translate('Onboarding.Start.Body2')}
                </Text>
              </Box>
            </Box>
          </ScrollView>
          <Box height={5} maxHeight={2} borderTopWidth={2} borderTopColor="gray5" />
          <StepText index={1} />
          <NextButton onNext={onNext} />
        </Box>
      </SafeAreaView>
    </Box>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
  },
  spacer: {
    marginBottom: 54,
  },
});
