package com.johnsoncskoo.gymfinder.gym;

import com.johnsoncskoo.gymfinder.gym.dto.EquipmentDTO;
import com.johnsoncskoo.gymfinder.gym.dto.FacilityDTO;
import com.johnsoncskoo.gymfinder.gym.dto.GymDTO;
import com.johnsoncskoo.gymfinder.gym.dto.ServiceDTO;

import java.util.List;

public interface GymService {
    // Gyms
    GymDTO createGym(GymDTO gymDTO);
    GymDTO updateGym(String id, GymDTO gymDTO);
    void deleteGym(String id);
    List<GymDTO> getAllGyms();

    // Equipments
    EquipmentDTO createEquipment(String gymId, EquipmentDTO equipmentDTO);
    EquipmentDTO updateEquipment(Integer id, EquipmentDTO equipmentDTO);
    void deleteEquipment(Integer id);
    List<EquipmentDTO> getAllEquipments(String gymId);

    // Facilities
    FacilityDTO createFacility(String gymId, FacilityDTO facilityDTO);
    FacilityDTO updateFacility(Integer id, FacilityDTO facilityDTO);
    void deleteFacility(Integer id);
    List<FacilityDTO> getAllFacilities(String gymId);

    // Services
    ServiceDTO createService(String gymId, ServiceDTO serviceDTO);
    ServiceDTO updateService(Integer id, ServiceDTO serviceDTO);
    void deleteService(Integer id);
    List<ServiceDTO> getAllServices(String gymId);
}