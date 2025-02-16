package com.johnsoncskoo.gymfinder.gym.impl;

import com.johnsoncskoo.gymfinder.common.AddressService;
import com.johnsoncskoo.gymfinder.common.exceptions.ResourceNotFoundException;
import com.johnsoncskoo.gymfinder.file.ImageService;
import com.johnsoncskoo.gymfinder.file.dto.CreateImageDTO;
import com.johnsoncskoo.gymfinder.gym.GymService;
import com.johnsoncskoo.gymfinder.gym.dto.EquipmentDTO;
import com.johnsoncskoo.gymfinder.gym.dto.FacilityDTO;
import com.johnsoncskoo.gymfinder.gym.dto.GymDTO;
import com.johnsoncskoo.gymfinder.gym.dto.ServiceDTO;
import com.johnsoncskoo.gymfinder.gym.model.Equipment;
import com.johnsoncskoo.gymfinder.gym.model.Facility;
import com.johnsoncskoo.gymfinder.gym.model.Gym;
import com.johnsoncskoo.gymfinder.gym.repository.EquipmentRepository;
import com.johnsoncskoo.gymfinder.gym.repository.FacilityRepository;
import com.johnsoncskoo.gymfinder.gym.repository.GymRepository;
import com.johnsoncskoo.gymfinder.gym.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GymServiceImpl implements GymService {

    private final GymRepository gymRepository;
    private final EquipmentRepository equipmentRepository;
    private final FacilityRepository facilityRepository;
    private final ServiceRepository serviceRepository;
    private final AddressService addressService;
    private final ImageService imageService;

    @Override
    public GymDTO createGym(GymDTO gymDTO) {
        var gym = GymDTO.toEntity(gymDTO);

        var createdAddress = addressService.createAddress(gymDTO.address());
        gym.setAddress(createdAddress);

        var savedGym = gymRepository.save(gym);
        return GymDTO.fromEntity(savedGym);
    }

    @Override
    public GymDTO updateGym(String id, GymDTO gymDTO) {
        var gym = gymRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.toException(Gym.class, id));

        var updatedAddress = addressService.updateAddress(
                gym.getAddress().getId(),
                gymDTO.address()
        );
        gym.setName(gymDTO.name());
        gym.setOpeningStatus(gymDTO.openingStatus());
        gym.setAddress(updatedAddress);

        var updatedGym = gymRepository.save(gym);
        return GymDTO.fromEntity(updatedGym);
    }

    @Override
    public void deleteGym(String id) {
        var gym = gymRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.toException(Gym.class, id));
        addressService.deleteAddress(gym.getAddress().getId());
        gymRepository.deleteById(id);
    }

    @Override
    public Iterable<GymDTO> getAllGyms() {
        return gymRepository.findAll()
                .stream().map(GymDTO::fromEntity)
                .toList();
    }

    @Override
    public String uploadGymImage(String id, CreateImageDTO createImageDTO) {
        var gym = gymRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.toException(Gym.class, id));

        var createdImage = imageService.createImage(createImageDTO);
        gym.addImage(createdImage);
        gymRepository.save(gym);

        return createdImage.getFile().getFileUrl();
    }

    @Override
    public EquipmentDTO createEquipment(String gymId, EquipmentDTO equipmentDTO) {
        var gym = gymRepository.findById(gymId)
                .orElseThrow(() -> ResourceNotFoundException.toException(Gym.class, gymId));

        var equipment = EquipmentDTO.toEntity(equipmentDTO);
        equipment.setGym(gym);
        var createdEquipment = equipmentRepository.save(equipment);
        return EquipmentDTO.fromEntity(createdEquipment);
    }

    @Override
    public EquipmentDTO updateEquipment(Integer id, EquipmentDTO equipmentDTO) {
        var equipment = equipmentRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.toException(Equipment.class, id));

        equipment.setName(equipmentDTO.name());
        equipment.setDescription(equipmentDTO.description());
        equipment.setEquipmentType(equipment.getEquipmentType());

        var updatedEquipment = equipmentRepository.save(equipment);
        return EquipmentDTO.fromEntity(updatedEquipment);
    }

    @Override
    public void deleteEquipment(Integer id) {
        if (!equipmentRepository.existsById(id))
            throw ResourceNotFoundException.toException(Equipment.class, id);

        equipmentRepository.deleteById(id);
    }

    @Override
    public Iterable<EquipmentDTO> getAllEquipments(String gymId) {
        return equipmentRepository.findAllByGymId(gymId)
                .stream().map(EquipmentDTO::fromEntity)
                .toList();
    }

    @Override
    public String uploadEquipmentImage(Integer id, CreateImageDTO createImageDTO) {
        var equipment = equipmentRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.toException(Equipment.class, id));

        var createdImage = imageService.createImage(createImageDTO);
        equipment.addImage(createdImage);
        equipmentRepository.save(equipment);

        return createdImage.getFile().getFileUrl();
    }

    @Override
    public FacilityDTO createFacility(String gymId, FacilityDTO facilityDTO) {
        var gym = gymRepository.findById(gymId)
                .orElseThrow(() -> ResourceNotFoundException.toException(Gym.class, gymId));

        var facility = FacilityDTO.toEntity(facilityDTO);
        facility.setGym(gym);
        var createdFacility = facilityRepository.save(facility);
        return FacilityDTO.fromEntity(createdFacility);
    }

    @Override
    public FacilityDTO updateFacility(Integer id, FacilityDTO facilityDTO) {
        var facility = facilityRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.toException(Facility.class, id));

        facility.setName(facilityDTO.name());
        facility.setDescription(facilityDTO.description());
        facility.setFacilityType(facility.getFacilityType());

        var updatedFacility = facilityRepository.save(facility);
        return FacilityDTO.fromEntity(updatedFacility);
    }

    @Override
    public void deleteFacility(Integer id) {
        if (!facilityRepository.existsById(id))
            throw ResourceNotFoundException.toException(Facility.class, id);

        facilityRepository.deleteById(id);
    }

    @Override
    public Iterable<FacilityDTO> getAllFacilities(String gymId) {
        return facilityRepository.findAllByGymId(gymId)
                .stream().map(FacilityDTO::fromEntity)
                .toList();
    }

    @Override
    public String uploadFacilityImage(Integer id, CreateImageDTO createImageDTO) {
        var facility = facilityRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.toException(Facility.class, id));

        var createdImage = imageService.createImage(createImageDTO);
        facility.addImage(createdImage);
        facilityRepository.save(facility);

        return createdImage.getFile().getFileUrl();
    }

    @Override
    public ServiceDTO createService(String gymId, ServiceDTO serviceDTO) {
        var gym = gymRepository.findById(gymId)
                .orElseThrow(() -> ResourceNotFoundException.toException(Gym.class, gymId));

        var service = ServiceDTO.toEntity(serviceDTO);
        service.setGym(gym);
        var createdService = serviceRepository.save(service);
        return ServiceDTO.fromEntity(createdService);
    }

    @Override
    public ServiceDTO updateService(Integer id, ServiceDTO serviceDTO) {
        var service = serviceRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.toException(Service.class, id));

        service.setName(serviceDTO.name());
        service.setDescription(serviceDTO.description());
        service.setServiceType(serviceDTO.serviceType());

        var updatedService = serviceRepository.save(service);
        return ServiceDTO.fromEntity(updatedService);
    }

    @Override
    public void deleteService(Integer id) {
        if (!serviceRepository.existsById(id))
            throw ResourceNotFoundException.toException(Service.class, id);

        serviceRepository.deleteById(id);
    }

    @Override
    public Iterable<ServiceDTO> getAllServices(String gymId) {
        return serviceRepository.findAllByGymId(gymId)
                .stream().map(ServiceDTO::fromEntity)
                .toList();
    }
}
