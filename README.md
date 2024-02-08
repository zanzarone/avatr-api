<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/zanzarone/avatr-api">
    <img src="images/logo_name.png" alt="Logo" width="192" height="46">
  </a>
  <h1 align="center">API Backend</h1>

  <p align="center">
    Backend service for AvatR App
    <br />
    ·
    <a href="https://github.com/zanzarone/avatr-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/zanzarone/avatr-api/issues">Request Feature</a>
  </p>
</div>

<div align="center">

<a href="https://it.linkedin.com/in/samuele-scatena">![linkedin-url](https://img.shields.io/badge/-LinkedIn-black.svg?logo=linkedin&colorB=555)</a>
<a href="#license">![license](https://img.shields.io/badge/License-MIT-blue)</a>

</div>

<!-- ABOUT THE PROJECT -->

## About The Project

This project handles the REST calls made by the AvatR application.

## Getting Started

### Prerequisites

- You must have `npm` installed on your machine in order to run the project.
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/zanzarone/avatr-api.git
   ```

2. Enter in the project directory
   ```sh
   cd avatr-api
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create an `.env` file in the root of the project with this enviroment variables:
   ```js
   NODE_ENV = ""; //'production' or 'development'
   PORT = ""; // port number where the server will listen
   ALLOWED_ORIGINS = "[]"; // array of strings
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

### Usage

Run:

- `npm run dev` to star the service in **development** mode or
- `npm start` to star the service in **production** mode

## API Endpoints

### Generate avatar

| HTTP Method | Endpoints        | Action                         | Params    |
| ----------- | ---------------- | ------------------------------ | --------- |
| POST        | /api/v1/generate | To generate the `.png` picture | body JSON |

**Parameters**

**NB**: All parameters value are **case sensitive**.

| Name       | Value                                                                     | Type   | Mandatory |
| ---------- | ------------------------------------------------------------------------- | ------ | --------- |
| bg         | `["BG1","BG2","BG3","BG4","BG5","BG6","BG7"]`                             | String | **NO**    |
| base       | `["B1","B2"]`                                                             | String | **YES**   |
| skin       | `["S1","S2","S3","S4","S5","S6",]`                                        | String | **YES**   |
| mouth      | `["M1","M2","M3","M4","M5","M6","M7","M8","M9","M10","M11","M12","M13",]` | String | **YES**   |
| nose       | `["N1","N2","N3","N4","N5","N6","N7","N8","N9","N10","N11","N12",]`       | String | **YES**   |
| hair type  | `["H1","H2","H3","H4","H5","H6","H7","H8","H9","H10",]`                   | String | **YES**   |
| hair color | `[1,2,3,4]`                                                               | Int    | **YES**   |
| ears       | `["EA1", "EA2"]`                                                          | String | **YES**   |
| eyes type  | `["E1","E2","E3","E4","E5",]`                                             | String | **YES**   |
| eyes color | `[1,2,3,4,5,6]`                                                           | Int    | **YES**   |

Example request:

```json
{
  "bg": "BG2",
  "base": "B1",
  "skin": "S1",
  "mouth": "M4",
  "nose": "N12",
  "hair": {
    "type": "H10",
    "color": 1
  },
  "ears": "EA2",
  "eyes": {
    "color": 1,
    "type": "E1"
  }
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [] Handle of different image's file type
- [] Limit request from the same IP

See the [open issues](https://github.com/zanzarone/avatr-api/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Samuele Scatena - [@LinkedIn](https://it.linkedin.com/in/samuele-scatena) - samuele.scatena@gmail.com

Project Link: [https://github.com/zanzarone/avatr-api](https://github.com/zanzarone/avatr-api)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
