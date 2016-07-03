def volumeChange(volumes):

    print "volumes:",volumes
    last_day = volumes[-1]
    last_three_day = np.average(volumes[-3])
    last_week = np.average(volumes[-7])

    one_day = np.average(volumes[-2:-1])
    three_day = np.average(volumes[-4:-1])
    one_week = np.average(volumes[-8:-1])
    two_week = np.average(volumes[-14:-1])
    one_month = np.average(volumes[-31:-1])

    change = {
        "one_day": (last_day-one_day)/last_day,
        "three_day": (last_day-three_day)/last_day,
        "one_week": (last_day-one_week)/last_day,
        "two_week": (last_day-two_week)/last_day,
        "one_month": (last_day-one_month)/last_day
    }

    change_vroc = {
        "one_day": ((last_day/one_day)-1)*100,
        "three_day": ((last_day/three_day)-1)*100,
        "one_week": ((last_day/one_week)-1)*100,
        "two_week": ((last_day/two_week)-1)*100,
        "one_month": ((last_day/one_month)-1)*100
    }
    pp(change)
    pp(change_vroc)
    # print three_day,one_week,two_week,one_month