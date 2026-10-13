import wmi
import csv
from rich.console import Console
from rich.table import Table
from rich import box

computer = wmi.WMI(namespace=r"root\cimv2")
devices = computer.Win32_PnPEntity()

properties = [
    "Name",
    "Manufacturer",
    "Description",
    "Status",
    "DeviceID",
    "PNPDeviceID",
    "Service"
]

rows = []

for device in devices:
    details = {}

    for prop in properties:
        try:
            details[prop] = getattr(device, prop, None)
        except Exception:
            details[prop] = None

    rows.append(details)

if rows:
    table = Table(
        box=box.SIMPLE,
        show_lines=True,
        expand=True
    )

    for prop in properties:
        table.add_column(prop, overflow="fold")

    for row in rows:
        table.add_row(*[
            "" if row[prop] is None else str(row[prop])
            for prop in properties
        ])

    Console().print(table)

    with open(
        "device_details.csv",
        "w",
        newline="",
        encoding="utf-8-sig"
    ) as file:
        writer = csv.DictWriter(file, fieldnames=properties)
        writer.writeheader()
        writer.writerows(rows)

    print("\nSaved to device_details.csv")

else:
    print("No devices found.")