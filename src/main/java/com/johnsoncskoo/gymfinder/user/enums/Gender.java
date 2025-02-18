package com.johnsoncskoo.gymfinder.user.enums;

import com.johnsoncskoo.gymfinder.util.DisplayUtil;
import com.johnsoncskoo.gymfinder.util.Displayable;

public enum Gender implements Displayable {
    MALE,
    FEMALE,
    PREFER_NOT_TO_SAY;

    @Override
    public String getDisplayName() {
        return DisplayUtil.getDisplayName(this);
    }
}
