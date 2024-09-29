from m5stack import *
from m5ui import *
from uiflow import *
import wifiCfg
from m5mqtt import M5mqtt
import time
import unit


setScreenColor(0x111111)
rgb_0 = unit.get(unit.RGB, unit.PORTB)
pir_0 = unit.get(unit.PIR, unit.PORTC)


on = None
off = None
open2 = None
motion_sensor_state = None



Status = M5TextBox(33, 137, "Status  : ", lcd.FONT_DejaVu24, 0xFFFFFF, rotate=0)
stateLigth = M5TextBox(161, 137, "turn off", lcd.FONT_DejaVu24, 0xFFFFFF, rotate=0)
Detected = M5TextBox(52, 46, "Detected", lcd.FONT_DejaVu40, 0xFFFFFF, rotate=0)


# Describe this function...
def Turn_on_ligth(on):
  global off, open2, motion_sensor_state
  rgb_0.setColor(1, 0xffffff)
  rgb_0.setColor(2, 0xffffff)
  rgb_0.setColor(3, 0xffffff)

# Describe this function...
def Turn_off_ligth(off):
  global on, open2, motion_sensor_state
  rgb_0.setColor(1, 0x000000)
  rgb_0.setColor(2, 0x000000)
  rgb_0.setColor(3, 0x000000)


def fun_Test_Hcrl_Project_Botnoi_SmartHome_Sorawit_sentData_(topic_data):
  global open2, motion_sensor_state
  open2 = topic_data
  pass


Detected.hide()
Status.setPosition(36, 102)
stateLigth.setPosition(158, 102)
Turn_off_ligth(None)
wifiCfg.doConnect('nut', '25462549')
m5mqtt = M5mqtt('', 'broker.hivemq.com', 1883, '', '', 60)
m5mqtt.subscribe(str('Test/Hcrl/Project/Botnoi/SmartHome/Sorawit/sentData'), fun_Test_Hcrl_Project_Botnoi_SmartHome_Sorawit_sentData_)
m5mqtt.start()
while True:
  motion_sensor_state = pir_0.state
  if motion_sensor_state == 1:
    Detected.setText('Detected')
    Detected.show()
    Status.setPosition(36, 144)
    stateLigth.setPosition(158, 144)
    stateLigth.setText('turn on')
    Turn_on_ligth(None)
    m5mqtt.publish(str('Test/Hcrl/Project/Botnoi/SmartHome/Sorawit'), str('detected'), 2)
    wait(600)
    stateLigth.setText('turn off')
    Turn_off_ligth(None)
    Detected.hide()
    Status.setPosition(36, 102)
    stateLigth.setPosition(158, 102)
  if open2 == '5':
    Detected.setText('Remoted')
    Detected.show()
    Status.setPosition(36, 144)
    stateLigth.setPosition(158, 144)
    stateLigth.setText('turn on')
    Turn_on_ligth(None)
    wait(900)
    Turn_off_ligth(None)
    Detected.hide()
    Status.setPosition(36, 102)
    stateLigth.setPosition(158, 102)
    stateLigth.setText('turn off')
    open2 = '-1'
  elif open2 == '15':
    Detected.setText('Remoted')
    Detected.show()
    Status.setPosition(36, 144)
    stateLigth.setPosition(158, 144)
    stateLigth.setText('turn on')
    Turn_on_ligth(None)
    wait(1500)
    Turn_off_ligth(None)
    Detected.hide()
    Status.setPosition(36, 102)
    stateLigth.setPosition(158, 102)
    stateLigth.setText('turn off')
    open2 = '-1'
  elif open2 == '30':
    Detected.setText('Remoted')
    Detected.show()
    Status.setPosition(36, 144)
    stateLigth.setPosition(158, 144)
    stateLigth.setText('turn on')
    Turn_on_ligth(None)
    wait(2400)
    Turn_off_ligth(None)
    Detected.hide()
    Status.setPosition(36, 102)
    stateLigth.setPosition(158, 102)
    stateLigth.setText('turn off')
    open2 = '-1'
  wait_ms(2)