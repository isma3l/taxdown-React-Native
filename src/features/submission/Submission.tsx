import React, { useEffect } from 'react';
import { Box, Button, VStack, Spinner } from 'native-base';
import { useForm } from 'react-hook-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { useAppDispatch, useTypedSelector } from '@/hooks';
import {
  selectInputFields,
  fetchForm,
  createSubmission,
  selectLoadingFetch,
  selectLoadingCreate,
} from './slices';
import { Field } from './components';

type SubmissionProps = NativeStackScreenProps<RootStackParamList, 'Submission'>;

const Submission = ({ route }: SubmissionProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const { taxId } = route?.params;
  const inputsFields = useTypedSelector(selectInputFields);
  const loadingFetch = useTypedSelector(selectLoadingFetch);
  const loadingCreate = useTypedSelector(selectLoadingCreate);

  useEffect(() => {
    dispatch(fetchForm(taxId));
  }, [dispatch, taxId]);

  const onSubmit = (newSubmission: any) => {
    dispatch(createSubmission({ ...newSubmission, taxId }));
    console.log(newSubmission);
  };

  return (
    <VStack safeArea flex="1">
      <Box
        rounded="lg"
        borderColor="coolGray.200"
        borderWidth="1"
        flex="1"
        margin={4}
        justifyContent="space-between"
        background="white"
        width="90%">
        {loadingFetch ? (
          <Box justifyContent="center" alignItems="center" flex="1">
            <Spinner size="lg" />
          </Box>
        ) : (
          <>
            <VStack width="100%" paddingX="8" paddingTop="4">
              {inputsFields.map((inputField, index) => (
                <Field key={index} {...inputField} control={control} errors={errors} />
              ))}
            </VStack>
            <Button
              mt="2"
              colorScheme="indigo"
              marginBottom="8"
              marginX="16"
              isDisabled={loadingCreate}
              onPress={handleSubmit(onSubmit)}>
              Create submission
            </Button>
          </>
        )}
      </Box>
    </VStack>
  );
};

export default Submission;
