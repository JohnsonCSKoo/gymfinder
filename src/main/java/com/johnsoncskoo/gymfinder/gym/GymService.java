package com.johnsoncskoo.gymfinder.gym;

import com.johnsoncskoo.gymfinder.file.dto.CreateImageDTO;
import com.johnsoncskoo.gymfinder.gym.dto.EquipmentDTO;
import com.johnsoncskoo.gymfinder.gym.dto.FacilityDTO;
import com.johnsoncskoo.gymfinder.gym.dto.GymDTO;
import com.johnsoncskoo.gymfinder.gym.dto.ServiceDTO;

public interface GymService {
    // Gyms
    GymDTO createGym(GymDTO gymDTO);
    GymDTO updateGym(String id, GymDTO gymDTO);
    void deleteGym(String id);
    Iterable<GymDTO> getAllGyms();
    String uploadGymImage(String id, CreateImageDTO createImageDTO);

    // Equipments
    EquipmentDTO createEquipment(String gymId, EquipmentDTO equipmentDTO);
    EquipmentDTO updateEquipment(Integer id, EquipmentDTO equipmentDTO);
    void deleteEquipment(Integer id);
    Iterable<EquipmentDTO> getAllEquipments(String gymId);
    String uploadEquipmentImage(Integer id, CreateImageDTO createImageDTO);

    // Facilities
    FacilityDTO createFacility(String gymId, FacilityDTO facilityDTO);
    FacilityDTO updateFacility(Integer id, FacilityDTO facilityDTO);
    void deleteFacility(Integer id);
    Iterable<FacilityDTO> getAllFacilities(String gymId);
    String uploadFacilityImage(Integer id, CreateImageDTO createImageDTO);

    // Services
    ServiceDTO createService(String gymId, ServiceDTO serviceDTO);
    ServiceDTO updateService(Integer id, ServiceDTO serviceDTO);
    void deleteService(Integer id);
    Iterable<ServiceDTO> getAllServices(String gymId);
}