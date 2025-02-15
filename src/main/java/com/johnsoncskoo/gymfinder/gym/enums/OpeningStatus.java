package com.johnsoncskoo.gymfinder.gym.enums;

import com.johnsoncskoo.gymfinder.util.DisplayUtil;
import com.johnsoncskoo.gymfinder.util.Displayable;

public enum OpeningStatus implements Displayable {
    OPEN,
    CLOSED,
    TEMPORARILY_CLOSED,
    UNDER_RENOVATION;

    @Override
    public String getDisplayName() {
        return DisplayUtil.getDisplayName(this);
    }
}
