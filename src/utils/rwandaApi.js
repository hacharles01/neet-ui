
import rwandaData from './locations.json';

export const fetchProvinces = async () => {
	return rwandaData.provinces.map(province => province.name);
};

export const fetchDistricts = async (province) => {
	const provinceData = rwandaData.provinces.find(p =>
		p.name.toLowerCase() === province.toLowerCase()
	);
	return provinceData ? provinceData.districts.map(district => district.name) : [];
};

export const fetchSectors = async (province, district) => {
	const provinceData = rwandaData.provinces.find(p =>
		p.name.toLowerCase() === province.toLowerCase()
	);
	if (!provinceData) return [];

	const districtData = provinceData.districts.find(d =>
		d.name.toLowerCase() === district.toLowerCase()
	);
	return districtData ? districtData.sectors.map(sector => sector.name) : [];
};

export const fetchCells = async (province, district, sector) => {
	const provinceData = rwandaData.provinces.find(p =>
		p.name.toLowerCase() === province.toLowerCase()
	);
	if (!provinceData) return [];

	const districtData = provinceData.districts.find(d =>
		d.name.toLowerCase() === district.toLowerCase()
	);
	if (!districtData) return [];

	const sectorData = districtData.sectors.find(s =>
		s.name.toLowerCase() === sector.toLowerCase()
	);
	return sectorData ? sectorData.cells.map(cell => cell.name) : [];
};

export const fetchVillages = async (province, district, sector, cell) => {
	const provinceData = rwandaData.provinces.find(p =>
		p.name.toLowerCase() === province.toLowerCase()
	);
	if (!provinceData) return [];

	const districtData = provinceData.districts.find(d =>
		d.name.toLowerCase() === district.toLowerCase()
	);
	if (!districtData) return [];

	const sectorData = districtData.sectors.find(s =>
		s.name.toLowerCase() === sector.toLowerCase()
	);
	if (!sectorData) return [];

	const cellData = sectorData.cells.find(c =>
		c.name.toLowerCase() === cell.toLowerCase()
	);
	return cellData ? cellData.villages.map(village => village.name) : [];
};