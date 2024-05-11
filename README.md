<p align='center'>
  English | <a href="https://github.com/TencentCloud/virtualman-render-demo/blob/main/README.zh-CN.md">中文</a>
</p>

# Tencent Cloud Virtual Man render H5 demo

This project includes both client-side rendering and server-side rendering methods. For client-side rendering, refer to [client-render-demo](https://github.com/TencentCloud/virtualman-render-demo/tree/main/client-render-demo), and for server-side rendering, refer to[server-render-demo](https://github.com/TencentCloud/virtualman-render-demo/tree/main/server-render-demo)

## Project Structure

- `client-render-demo`: Client-side rendering example
- `server-render-demo`: Server-side rendering example

## Installation and Usage

### Environment Requirements

Chrome

### Installation

Copy the project code to your local machine.

### Running the Example

#### Client-side Rendering Example

1. Open the `client-render-demo` directory.
2. Start a local server in this directory.
3. Open the `index.html` file in your browser. If you are using a local server, you can do this by visiting `http://localhost:3000/index.html`.
4. Add the execution URL parameters, for example: `http://localhost:3000/index.html?virtualmanKey=xxxx&sign=xxxx&config=xxxx`.
 - `virtualmanKey`:  Unique identifier for the image. You can obtain this value by [getting the key](https://cloud.tencent.com/document/product/1240/104050#2e81fe93-d83f-4d22-b916-5d1d427d577f) and following the specified steps.
 - `sign`: Signature. Please note that URL encoding is not required here. This can also be obtained by visiting[getting the key](https://cloud.tencent.com/document/product/1240/104050#2e81fe93-d83f-4d22-b916-5d1d427d577f).
 - `config`: The address to get the model structure, used to generate the specific model data address.

Note: The config parameter is a URL address used to get the JSON file of the model structure. This JSON file contains detailed information about the model, used to generate the specific model data address.

Example:

Config address: http://example.com/meta.json

Config file content:
```json
{
    "modelPath": "model.glb",
    "actionPaths": [
        "action/tanshou.json",
        "action/appearance.json",
        "action/bow_and_bow.json",
        "action/juyoushou.json",
        "action/juzuoshou.json",
        "action/kending.json",
        "action/listening.json",
        "action/admission.json"
    ],
    "configPath": "config.json"
}
```
Model configuration directory structure

- `http://example.com/meta.json`: Model configuration data
- `http://example.com/model.glb`: Model data
- `http://example.com/action/tanshou.json`: Action data
- `http://example.com/config.json`: Image initialization position and angle


#### Server-side Rendering Example

1. Open the `server-render-demo` directory.
2. Start a local server in this directory.
3. Open the `index.html` file in your browser. If you are using a local server, you can do this by visiting `http://localhost:3000/index.html`.
4. Add the execution URL parameters, for example: `http://localhost:3000/index.html?virtualmanKey=xxxx&sign=xxxx`.
 - `virtualmanKey`: Unique identifier for the image. You can obtain this value by [getting the key](https://cloud.tencent.com/document/product/1240/104050#2e81fe93-d83f-4d22-b916-5d1d427d577f) and following the specified steps.
 - `sign`: Signature. Please note that URL encoding is not required here. This can also be obtained by visiting [getting the key](https://cloud.tencent.com/document/product/1240/104050#2e81fe93-d83f-4d22-b916-5d1d427d577f)。

### Speech Recognition Capability
 If you need to enable ASR, you need to add the secretId, secretKey, and appId parameters in the URL parameters.