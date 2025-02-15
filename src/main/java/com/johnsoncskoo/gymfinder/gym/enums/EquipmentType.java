package com.johnsoncskoo.gymfinder.gym.enums;

import com.johnsoncskoo.gymfinder.util.DisplayUtil;
import com.johnsoncskoo.gymfinder.util.Displayable;

public enum EquipmentType implements Displayable {
    BARBELL,
    DUMBBELL,
    KETTLEBELL,
    SQUAT_RACK,
    BENCH,
    TREADMILL,
    ROWING_MACHINE,
    CABLE_MACHINE,
    PULLUP_BAR,
    MEDICINE_BALL,
    RESISTANCE_BAND,
    FOAM_ROLLER,
    YOGA_MAT;

    @Override
    public String getDisplayName() {
        return DisplayUtil.getDisplayName(this);
    }
}
