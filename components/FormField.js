import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {Animated, Text, TextInput, View} from 'react-native';
import styles from '../styles/styles';

// Labelled text input with an optional "required" message and a shake() method for validation errors.
const FormField = forwardRef(({label, error, multiline, ...inputProps}, ref) => {
  const offset = useRef(new Animated.Value(0)).current;

  useImperativeHandle(ref, () => ({
    shake: () => {
      offset.setValue(0);
      Animated.sequence([10, -10, 6, -6, 0].map(toValue => (
        Animated.timing(offset, {toValue, duration: 50, useNativeDriver: true})
      ))).start();
    },
  }), [offset]);

  return (
    <View style={styles.formField}>
      <Text style={styles.formLabel}>{label}</Text>
      <Animated.View style={{transform: [{translateX: offset}]}}>
        <TextInput
          placeholderTextColor="#636263"
          multiline={multiline}
          style={[styles.formInput, multiline && styles.formInputMultiline]}
          {...inputProps}
        />
      </Animated.View>
      {error ? <Text style={styles.formError}>{error}</Text> : null}
    </View>
  );
});

export default FormField;
