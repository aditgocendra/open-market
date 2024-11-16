"use client";

import { ButtonSubmitForm } from "@/components/button-component";
import {
  ImageInputComponent,
  TextAreaComponent,
  TextInputComponent,
} from "@/components/input-component";
import { useFormState } from "react-dom";
import { setStoreInformationAction, setStoreLogoAction } from "../actions";
import { StoreInformationDto } from "@/lib/dto/store.dto";

export default function StoreInformationComponent({
  storeInfo,
}: {
  storeInfo: StoreInformationDto | null;
}) {
  const action = setStoreLogoAction.bind(
    null,
    storeInfo ? storeInfo.logo : null
  );

  const [stateLogo, formActionLogo] = useFormState(action, null);
  const [state, formAction] = useFormState(setStoreInformationAction, null);

  return (
    <div className='w-full border shadow-sm rounded-md'>
      <p className='text-sm text-slate-800 m-3'>Store Information</p>
      <hr />

      <form
        action={formActionLogo}
        className='p-3 my-2'>
        <ImageInputComponent
          input='image'
          size={80}
          defaultValue={storeInfo && `/images/logo/${storeInfo.logo}`}
        />

        <div className='mb-2'>
          <p className='text-red-600 text-xs'>
            {stateLogo?.errors?.image?.join()}
          </p>
          <p className='text-red-600 text-xs'>{stateLogo?.errorMessage}</p>
        </div>

        <ButtonSubmitForm title='Save Changes' />
      </form>

      <form
        action={formAction}
        className='p-3'>
        <TextInputComponent
          input='name'
          type='text'
          placeholder='Store Name'
          defaultValue={storeInfo ? storeInfo.name : ""}
          errorMessage={state?.errors?.name?.join()}
        />

        <TextAreaComponent
          input='description'
          placeholder='Description (Optional)'
          defaultValue={storeInfo ? storeInfo.description : ""}
        />

        <ButtonSubmitForm title='Save Changes' />
      </form>
    </div>
  );
}
