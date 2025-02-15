package com.johnsoncskoo.gymfinder.gym.enums;

import com.johnsoncskoo.gymfinder.util.DisplayUtil;
import com.johnsoncskoo.gymfinder.util.Displayable;

public enum ServiceType implements Displayable {
    PERSONAL_TRAINING,
    GROUP_CLASSES,
    PHYSIOTHERAPY,
    LOCKER_RENTAL,
    TOWEL_RENTAL,
    OTHERS;

    @Override
    public String getDisplayName() {
        return DisplayUtil.getDisplayName(this);
    }
}
