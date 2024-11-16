"use client";

import { ButtonSubmitForm } from "@/components/button-component";
import {
  SelectInputComponent,
  TextAreaComponent,
  TextInputComponent,
} from "@/components/input-component";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { setLocationStoreAction } from "../actions";
import { LocationDto } from "@/lib/dto/location.dto";

export default function LocationStoreComponent({
  locationDefault,
}: {
  locationDefault: LocationDto | null;
}) {
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const setRegion = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_REGION_URL}/provinces.json`
    );
    const result = await response.json();
    setProvinces(result);
  };
  useEffect(() => {
    setRegion();
  }, []);

  const fetchData = async ({
    state,
    id,
  }: {
    state: "province" | "regencies" | "districts" | "villages";
    id?: string | null;
  }) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_REGION_URL;
    let fetchUrl;

    switch (state) {
      case "regencies":
        fetchUrl = `${baseUrl}/regencies/${id}.json`;
        break;

      case "districts":
        fetchUrl = `${baseUrl}/districts/${id}.json`;
        break;
      case "villages":
        fetchUrl = `${baseUrl}/villages/${id}.json`;
        break;
      default:
        fetchUrl = `${baseUrl}/provinces.json`;
        break;
    }

    return await (await fetch(fetchUrl)).json();
  };

  const onChangeProvince = async (e: ChangeEvent<HTMLSelectElement>) => {
    const provinceId =
      e.target[e.target.selectedIndex].getAttribute("data-key");

    const result = await fetchData({ state: "regencies", id: provinceId });
    setRegencies(result);
  };

  const onChangeRegencies = async (e: ChangeEvent<HTMLSelectElement>) => {
    const regenciesId =
      e.target[e.target.selectedIndex].getAttribute("data-key");

    const result = await fetchData({ state: "districts", id: regenciesId });
    setDistricts(result);
  };

  const onChangeDistrict = async (e: ChangeEvent<HTMLSelectElement>) => {
    const villageId = e.target[e.target.selectedIndex].getAttribute("data-key");

    const result = await fetchData({ state: "villages", id: villageId });
    setVillages(result);
  };

  const [state, formAction] = useFormState(setLocationStoreAction, null);

  // const defaultRegencies = locationDefault
  //   ? regencies.find((r: RegionDto) => r.id === locationDefault.regencies)
  //   : regencies[0];
  // const defaultDistrict = locationDefault
  //   ? districts.find((d: RegionDto) => d.id === locationDefault.district)
  //   : districts[0];
  // const defaultVillage = locationDefault
  //   ? villages.find((v: RegionDto) => v.id === locationDefault.village)
  //   : villages[0];
  // const defaultProvince: RegionDto = locationDefault
  //   ? provinces.filter((p: RegionDto) => p.name === locationDefault.province)[0]
  //   : provinces[0];

  return (
    <div className='w-full border shadow-md rounded-sm'>
      <p className='text-sm text-slate-800 m-3'>Location Store</p>
      <hr />
      {locationDefault && (
        <div className='m-4 p-4 border rounded-md'>
          <p className='text-sm text-slate-800'>{`${locationDefault.address}, ${locationDefault.village}, ${locationDefault.district}, ${locationDefault.regencies}, ${locationDefault.province}`}</p>
        </div>
      )}
      {provinces.length > 0 && (
        <form
          action={formAction}
          className='p-3'>
          <SelectInputComponent
            input='province'
            onChange={onChangeProvince}
            options={provinces}
          />

          <SelectInputComponent
            input='regencies'
            onChange={onChangeRegencies}
            options={regencies}
          />

          <SelectInputComponent
            input='district'
            onChange={onChangeDistrict}
            options={districts}
          />

          <SelectInputComponent
            input='village'
            options={villages}
          />

          <TextInputComponent
            input='postalCode'
            type='number'
            placeholder='Postal Code'
          />

          <TextAreaComponent
            input='address'
            placeholder='Address'
          />

          <ButtonSubmitForm title='Save' />

          <p className='text-red-500'>{state?.errorMesage}</p>
        </form>
      )}
    </div>
  );
}
