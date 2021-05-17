import { useEffect, useRef } from 'react';
import { useStore } from 'effector-react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { DateTimePicker } from '@material-ui/pickers';
import { toast } from 'react-toastify';

import Button from '../components/Button';
import Container from '../components/Container';
import FormInput, { FormInputLabel } from '../components/FormInput';
import { approveWithDelayFx } from '../models/gld';
import { useGetAccountQuery } from '../generated/graphql';

interface FormValues {
  to: string;
  amount: number;
  unlock: string;
}

const FormContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormTitle = styled.h1`
  width: 100%;
  font-size: 36px;
  font-weight: 900;
  margin-bottom: 20px;
`;

const FormButton = styled(Button)`
  width: 100%;
`;

const schema = yup.object().shape({
  to: yup
    .string()
    .required('Recipient address is required')
    .test('is-eth-addr', 'Invalid ethereum address', (value) => {
      return (
        ethers.utils.isAddress(value || '') &&
        value !== ethers.constants.AddressZero
      );
    }),
  amount: yup
    .number()
    .positive('Transfer amount cannot be less than zero')
    .required('Transfer amount is required'),
  unlock: yup
    .string()
    .required()
    .test(
      'is-valid-date',
      'Unlock date is too small',
      (value) => new Date(value || 0).getTime() > Date.now()
    ),
});

export default function NewDelayedTranfer() {
  const { handleSubmit, register, errors, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { account, library } = useWeb3React<Web3Provider>();

  const { data } = useGetAccountQuery({
    variables: {
      id: (account || '').toLowerCase(),
    },
    pollInterval: 5000,
  });

  const history = useHistory();
  const pending = useStore(approveWithDelayFx.pending);

  const recipientInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (recipientInputRef.current) {
      register(recipientInputRef.current);
      recipientInputRef.current.focus();
    }
  }, [register]);

  const submit = handleSubmit(async (values) => {
    if (values.to.toLowerCase() === data?.account?.id) {
      return toast.error('Please, choose a different destination.');
    }

    const amount = ethers.utils.parseEther(values.amount.toString());
    if (amount.gt(data?.account?.balance || '0')) {
      return toast.error('Insufficient funds.');
    }

    if (library) {
      try {
        await approveWithDelayFx({ ...values, provider: library });
        history.push('/');
      } catch (e: unknown) {
        if (e instanceof Error) {
          toast.error('Failed to create delayed transfer.');
        }
      }
    }
  });

  return (
    <FormContainer>
      <Form onSubmit={submit} noValidate autoComplete="off">
        <FormTitle>New delayed transfer</FormTitle>
        <FormInput
          name="to"
          type="text"
          placeholder={ethers.constants.AddressZero}
          ref={recipientInputRef}
          disabled={pending}
          label="Recipient ETH address"
          error={errors.to}
        />
        <FormInput
          name="amount"
          type="number"
          step="any"
          placeholder="0"
          ref={register({ valueAsNumber: true })}
          disabled={pending}
          label="Amount of GLD to send"
          error={errors.amount}
        />
        <FormInputLabel error={!!errors.unlock} htmlFor="unlock">
          Unlock date
        </FormInputLabel>
        <Controller
          name="unlock"
          control={control}
          render={({ onChange, value }) => (
            <DateTimePicker
              style={{ marginBottom: '20px' }}
              autoOk
              ampm={false}
              value={value}
              onChange={onChange}
              minDate={new Date()}
              fullWidth
              error={!!errors.unlock}
              inputVariant="outlined"
              disabled={pending}
            />
          )}
        />
        <FormButton type="submit" disabled={pending}>
          {!pending ? 'Send transaction' : 'Loading...'}
        </FormButton>
      </Form>
    </FormContainer>
  );
}
