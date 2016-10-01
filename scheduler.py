import daily as daily
import schedule
import time

def job():
	print("Staring Job ...")
	localtime = time.asctime( time.localtime(time.time()) )
	print "Local current time :", localtime
	daily.doJob(None,True)
	

# schedule.every(1).minutes.do(job)
# schedule.every().hour.do(job)
schedule.every().day.at("06:45").do(job)
# schedule.every().monday.do(job)
# schedule.every().wednesday.at("13:15").do(job)

while True:
    schedule.run_pending()
    time.sleep(1)