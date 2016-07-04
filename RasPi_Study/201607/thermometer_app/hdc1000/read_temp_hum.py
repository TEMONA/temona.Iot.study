import AKI_I2C_HDC1000
import time

# sudo raspi-config (GUI)
# sudo nano /boot/config.txt => dtparam=i2c_arm=on
#sudo apt-get install python-smbus


hdc = AKI_I2C_HDC1000.AKI_I2C_HDC1000()
hdc.Config()

def sample(char):
    if char == 'T':
        data = "{"+'"Temp" : '+str(hdc.Temperature())+ "}"
        return data
    elif char == 'H':
        data = "{"+'"Humi" : '+str(hdc.Humidity())+ "}"
        return data
    else:
        arry = [0,0]
        arry[0] = hdc.Temperature()
        arry[1] = hdc.Humidity()
        data = "{"+'"Temp" : '+str(arry[0])+","+ '"Humi" : ' +str(arry[1])+ "}"
        return data

while 1:
        char = raw_input()
        print(sample(char))
        time.sleep(0.1)
