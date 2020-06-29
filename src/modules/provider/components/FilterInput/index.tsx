import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import { FilterInputContainer, Icon, Input } from './styles';

export interface IFilterInput {
  placeHolderText: string;
  onChangeTextFilter: React.Dispatch<React.SetStateAction<string>>;
}

const FilterInput: React.FC<IFilterInput> = ({
  onChangeTextFilter,
  placeHolderText,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <FilterInputContainer>
        <Icon name="search" size={20} color="#89828E" />

        <Input
          autoCapitalize="words"
          keyboardAppearance="dark"
          autoCorrect={false}
          placeholder={placeHolderText}
          onChangeText={text => onChangeTextFilter(text)}
          placeholderTextColor="#89828E"
        />
      </FilterInputContainer>
    </TouchableWithoutFeedback>
  );
};

export default FilterInput;
