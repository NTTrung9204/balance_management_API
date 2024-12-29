const OBJECT_ID_PATTERN = /^[0-9a-fA-F]{24}$/
const OBJECT_ID_PATTERN_MESSAGE = "Your string must match with the ObjectId"
const DATE_PATTERN = /^\d{2}\/\d{2}\/\d{4}$/
const DATE_PATTERN_MESSAGE = "Your date must match with the DatePattern"
const TIME_PATTERN = /^\d{2}:\d{2}\s[AP]M$/
const TIME_PATTERN_MESSAGE = "Your time must match with the DatePattern"

export const PATTERN_VALIDATOR = {
    OBJECT_ID_PATTERN,
    DATE_PATTERN,
    TIME_PATTERN
}

export const PATTERN_VALIDATOR_MESSAGE = {
    OBJECT_ID_PATTERN_MESSAGE,
    DATE_PATTERN_MESSAGE,
    TIME_PATTERN_MESSAGE
}

