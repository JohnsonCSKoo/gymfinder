package com.johnsoncskoo.gymfinder.gym.enums;

import com.johnsoncskoo.gymfinder.util.DisplayUtil;
import com.johnsoncskoo.gymfinder.util.Displayable;

public enum FacilityType implements Displayable {
    GYM,
    YOGA,
    SWIMMING_POOL,
    LOCKER,
    CHANGING_ROOM,
    SHOWER,
    PARKING,
    CAFETERIA,
    SAUNA,
    JACUZZI,
    COWORKING_SPACE,
    SPA,
    CLIMBING_WALL,
    ENTERTAINMENT;

    @Override
    public String getDisplayName() {
        return DisplayUtil.getDisplayName(this);
    }
}
