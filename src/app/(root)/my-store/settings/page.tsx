import { getStoreInformationAction, getStoreLocationAction } from "../actions";
import LocationStoreComponent from "../components/location-store-component";
import StoreInformationComponent from "../components/store-information-component";

export default async function StoreSettings() {
  const store = await getStoreInformationAction();
  let location = null;
  if (store !== null) {
    location = await getStoreLocationAction({ storeId: store.id });
  }

  return (
    <div className='flex flex-col gap-10'>
      <StoreInformationComponent storeInfo={store} />
      <LocationStoreComponent locationDefault={location} />
    </div>
  );
}
