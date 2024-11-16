export default async function MyStorePage() {
  return (
    <div className='w-full flex flex-col'>
      <div className='border shadow-sm rounded-md p-4'>
        {/* Grid item */}
        <div className='grid grid-cols-4'>
          <div className='flex flex-col justify-center items-center'>
            <p className='text-lg text-slate-800 font-semibold'>0</p>
            <p className='text-xs text-slate-500'>Products</p>
          </div>

          <div className='flex flex-col justify-center items-center'>
            <p className='text-lg text-slate-800 font-semibold'>0</p>
            <p className='text-xs text-slate-500'>Visitors</p>
          </div>

          <div className='flex flex-col justify-center items-center'>
            <p className='text-lg text-slate-800 font-semibold'>0</p>
            <p className='text-xs text-slate-500'>Orders</p>
          </div>

          <div className='flex flex-col justify-center items-center'>
            <p className='text-lg text-slate-800 font-semibold'>0</p>
            <p className='text-xs text-slate-500'>Total Sales</p>
          </div>
        </div>
      </div>
    </div>
  );
}
