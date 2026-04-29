SPANISH_MONTH_ABBR = {
    1: "ENE",
    2: "FEB",
    3: "MAR",
    4: "ABR",
    5: "MAY",
    6: "JUN",
    7: "JUL",
    8: "AGO",
    9: "SEP",
    10: "OCT",
    11: "NOV",
    12: "DIC",
}


def format_spanish_date(date_value):
    return f"{date_value.day:02d} {SPANISH_MONTH_ABBR[date_value.month]} {date_value.year}"


def format_spanish_month_year(date_value):
    return f"{SPANISH_MONTH_ABBR[date_value.month]} {date_value.year}"
