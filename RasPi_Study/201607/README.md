# IoT勉強会201607 オンライン温湿度計
## 使い方：
### I2Cポートの開放
```
sudo raspi-config
```
Advanced Option => A6 I2C => YES

### Python I2Cドライバーのインストール
```
sudo apt-get install python-smbus
```

### テストプログラムの起動
```
cd ~/temona.iot.study/RasPi_Study/201607/hdc1000/
python hdc1000.py
```

### Node.jsのインストール
#### nvmをインストール
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
```
#### Node.js(4.4以上)のインストール
```
nvm install 4.4.5
```
#### nvm設定の導入
```
source ~/.nvm/nvm.sh
```

### Node.jsモジュールのインストール
```
cd ~/temona.iot.study/RasPi_Study/201607/thermometer_app
npm install
```

### オンライン温湿度計の起動
```
# ポート不指定(3030ポートを使う)
node app.js

# ポート指定(3030が使われた時)
node app.js 3031
```
