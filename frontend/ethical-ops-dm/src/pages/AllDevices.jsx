function AllDevices() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">
          HOME / ALL DEVICES
        </div>
        <h1 className="text-3xl font-bold text-white">All Devices</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-primary p-6 rounded-lg border border-primary-light">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Targets</span>
          </div>
          <div className="text-4xl font-bold text-white">--</div>
        </div>

        <div className="bg-primary p-6 rounded-lg border border-primary-light">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Connected devices</span>
          </div>
          <div className="text-4xl font-bold text-accent-green">--</div>
        </div>
      </div>

      {/* Current Targets Section */}
      <div className="bg-primary rounded-lg border border-primary-light p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Current Targets</h2>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-primary-light text-sm text-gray-400 font-medium">
          <div className="col-span-4">DEVICE NAME</div>
          <div className="col-span-3">IP ADDRESS</div>
          <div className="col-span-2">TYPE</div>
          <div className="col-span-2">CONNECTION STATUS</div>
          <div className="col-span-1">ACTIONS</div>
        </div>

        {/* Empty state: rows will be rendered here once data exists */}
        <div className="px-4 py-12 text-center text-sm text-gray-500">
          No devices to display.
        </div>
      </div>
    </div>
  );
}

export default AllDevices;