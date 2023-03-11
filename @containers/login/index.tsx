// Core
import { type FC, useState } from "react";

// NextJS
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

// Global components
import { AlertBox, Button, Heading, Icon } from "@components";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

// Vendors
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import styled, { css } from "styled-components";

// Global styles
import { Field, Label } from "@styles";

const Login = styled.div`
  min-height: 100vh;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.background};
  `}
`;

const Wrap = styled.div`
  padding: 40px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 rgb(67 89 113 / 12%);

  button {
    width: 100%;
    justify-content: center;
  }

  ${({ theme: { colors } }) => css`
    background-color: ${colors.white};
  `}
`;

const Logo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const Password = styled.div`
  position: relative;

  svg {
    width: 20px;
    height: 100%;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate(0, -50%);
  }
`;

const LoginSchema = Yup.object().shape({
  userName: Yup.string().required("User name is required"),
  password: Yup.string().required("Password is required"),
});

interface Formvalues {
  userName: string;
  password: string;
}

const index: FC = () => {
  // Handle router
  const router = useRouter();

  // Handle errors
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  // Handle hide/shop password
  const [visiblePassword, setVisiblePassword] = useState(false);

  return (
    <Login>
      <Container>
        <Row justifyContent={{ md: "center" }} alignItems={{ md: "center" }}>
          <Column responsivity={{ md: 4, sm: 12 }}>
            <Wrap>
              <Logo>
                <svg
                  width="130"
                  viewBox="0 0 1110 434"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M759.667 1.6C759.267 2.53333 758.867 41.7333 758.733 88.6667C758.333 166.4 758.067 174.4 756.067 178.133C753 183.867 746.6 188.933 740.6 190.667C733.933 192.4 682.467 192.4 675.667 190.533C668.6 188.533 661 180.8 659 173.467C658.067 169.6 657.667 156.933 657.933 134.933C658.333 102.8 658.467 101.867 661.667 96.2667C663.4 93.0667 667 89.2 669.667 87.6C674.067 84.8 676.2 84.6667 710.333 84L746.333 83.3333L746.733 72.9333L747.133 62.5333L706.733 62.9333C668.733 63.3333 665.933 63.6 660.2 66.2667C656.733 67.8667 651.8 71.2 649.133 73.8667C638.333 84.8 636.333 94.2667 636.333 136.667C636.333 154.267 637 172.533 637.667 177.2C641 197.467 652.733 209.067 673.267 212C685 213.6 731.667 213.6 743.4 212C763.933 209.067 775.533 197.733 779 177.2C779.933 171.467 780.333 140.8 780.067 84.6667L779.667 0.666668L769.933 0.266668C763 1.08778e-06 760.067 0.400001 759.667 1.6Z"
                    fill="black"
                  />
                  <path
                    d="M167.667 48.8C138.867 52.9333 109.8 64.2666 84.3333 81.0666C70.3333 90.4 44.6 115.733 35.5333 129.333C20.3333 151.733 10.7333 173.733 4.86662 198.667C0.73329 215.867 -0.733377 245.733 1.53329 262.667C10.4666 329.067 49.5333 384.267 107.667 412.667C133.133 425.067 146.333 428.933 174.467 432.133C209.8 436.133 253.933 427.6 285.667 410.533C298.333 403.6 315.267 391.6 321.133 385.067L325.667 380L325.933 323.6C326.067 262.933 326.067 260.533 324.2 257.067C321.533 252.133 315.667 251.867 218.067 252.267L123 252.667L119.4 256.267C114.6 261.067 114.6 268.267 119.533 273.2L123 276.667H212.6H302.333L302.733 322.933C303.133 376 304.733 369.6 288.467 380.533C259 400.133 227.667 409.733 193 409.6C165.933 409.6 146.333 405.333 123.133 394.533C104.2 385.733 81.9333 370 71 357.733C49.8 334.133 36.6 310.4 28.8666 281.867C25.4 269.467 25.1333 266.933 25.1333 240.667C25 214 25.1333 212 28.7333 199.333C42.6 149.067 73.9333 110.667 119.667 87.6C140.467 77.0666 161.267 72 187.8 71.0666C217.267 69.8666 240.467 74.6666 265 87.0666C276.467 92.8 295.533 104.8 302.2 110.667C308.333 116 312.067 117.6 316.333 116.667C321.267 115.6 324.333 112.133 325.267 106.267C325.933 102.133 325.267 100.933 320.6 95.7333C309.133 83.3333 284.067 67.7333 263 60C238.867 51.0666 227.533 49.0666 198.333 48.6666C183.667 48.4 169.933 48.5333 167.667 48.8Z"
                    fill="black"
                  />
                  <path
                    d="M384.2 64.5333C370.333 68.2667 360.867 77.0667 356.067 90.5333C354.733 94.1333 354.333 109.733 354.333 154V212.667H364.333H374.333L375 156.667C375.667 96.8 375.8 96.5333 382.6 90.4C388.467 85.0667 394.067 84 416.733 84C434.067 84 439 83.6 440.2 82.1333C441.133 80.9333 441.667 76.8 441.4 71.7333L441 63.3333L415.667 63.0667C398.867 62.9333 388.333 63.3333 384.2 64.5333Z"
                    fill="black"
                  />
                  <path
                    d="M468.6 72.2666L469 82L517 82.6666C571.267 83.4666 572.067 83.6 578.733 93.7333L582.333 99.0666L582.733 135.867C583.133 167.2 582.867 173.333 581 178.267C578.333 185.067 571.533 191.333 564.733 193.2C561.933 194 546.733 194.667 530.467 194.667C497.533 194.667 492.867 193.6 487.667 185.067C483.933 178.933 483.8 158.4 487.4 153.067C492.333 145.867 495.533 145.333 533.4 145.333C552.467 145.333 569 144.933 570.2 144.533C571.8 143.867 572.333 141.733 572.333 135.867V128H532.6C486.2 128 481.933 128.667 472.867 137.867C465.4 145.333 463.933 151.333 464.6 171.333C465.267 188.8 467.133 195.2 473.4 201.733C482.867 211.733 494.467 213.733 538.2 213.067C567.133 212.533 571.133 212.267 578.333 209.6C588.333 205.867 596.467 198.133 600.467 188.133C603.4 181.067 603.667 178.8 604.067 142C604.6 100.667 603.933 93.7333 598.2 82.5333C594.6 75.3333 588.867 70.1333 580.333 66.1333C574.6 63.4666 571.8 63.3333 521.267 62.9333L468.2 62.5333L468.6 72.2666Z"
                    fill="black"
                  />
                  <path
                    d="M817.4 65.6C817.133 67.3333 817.267 71.8666 817.4 75.6L817.933 82.6666H863.4C916.733 82.8 919.4 83.2 926.333 93.0666L930.333 98.9333L930.733 136.533C931.133 177.333 930.867 179.867 923.667 186.933C916.467 194.133 911.933 194.933 877.267 194.4C847.933 194 845.667 193.867 842.2 191.2C834.333 185.333 833 182.133 833 168.667C833 157.2 833.267 155.867 836.333 152.667C842.467 146.133 843.133 146 882.333 145.333L919.667 144.667V136.667V128.667L881.667 128.267C839.667 127.867 833 128.533 824.467 134.667C815.667 141.067 813.133 147.467 812.6 165.333C812.2 178.4 812.467 181.867 815 189.333C822.067 210.533 832.467 214 885.4 213.067C915 212.533 919.133 212.133 926.333 209.6C939 204.933 946.733 196 950.467 182C953.133 172 953 103.333 950.333 92.9333C947.8 83.0666 943 75.6 936.067 70.6666C925.667 63.0666 922.067 62.6666 867.533 62.6666H817.8L817.4 65.6Z"
                    fill="black"
                  />
                  <path
                    d="M1013.67 64.5333C1003.4 68.4 1001.67 69.3333 997 74.1333C986.067 85.0667 983.8 97.6 984.6 144.933C985.267 181.6 986.333 187.333 994.067 197.6C999.4 204.8 1009.93 210.133 1022.33 212C1027.53 212.8 1046.33 213.2 1065 213.067L1098.33 212.667V202.667V192.667L1061 192C1020.07 191.2 1018.87 190.933 1011.8 182.667C1006.33 176.133 1005.4 167.733 1005.93 133.333C1006.33 102.933 1006.47 101.867 1009.67 96.2666C1011.4 93.0666 1015 89.2 1017.67 87.6C1022.07 84.8 1023.93 84.6666 1057.67 84.2666C1077.13 84.1333 1094.33 83.7333 1096.07 83.3333C1098.73 82.6666 1099 81.8667 1099 72.6667V62.6667H1058.73C1028.6 62.8 1017.13 63.2 1013.67 64.5333Z"
                    fill="black"
                  />
                  <path
                    d="M123.533 208C116.2 210.933 114.333 220.133 119.533 226.267L122.733 230L217.667 230.4C302.733 230.667 312.867 230.533 317 228.533C325.667 224.533 326.067 212.667 317.667 208.4C315.133 207.067 293.533 206.667 220.333 206.8C168.6 206.8 125 207.333 123.533 208Z"
                    fill="black"
                  />
                  <path
                    d="M335.933 234.267C335.4 234.667 335 238 335 241.6V248H722.467H1109.8L1109.4 240.933L1109 234L722.867 233.6C510.467 233.467 336.333 233.733 335.933 234.267Z"
                    fill="black"
                  />
                  <path
                    d="M346.6 272.933C346.067 273.333 345.667 278.8 345.667 284.933V296H408.333H471V284V272H409.267C375.267 272 347 272.4 346.6 272.933Z"
                    fill="black"
                  />
                  <path
                    d="M492.867 273.733C492.467 274.8 492.333 280 492.6 285.467L493 295.333L534.6 296C574.067 296.667 576.333 296.8 579.933 299.467C592.067 308.533 592.733 324.133 581.267 332.533C577.667 335.2 575.267 335.333 535.267 336L493 336.667V380.667V424.667H505H517L517.4 392.267L517.667 360H532.733C542.867 360 548.467 360.533 549.933 361.6C551 362.533 556.867 371.467 563 381.333C593.4 430.667 588.467 425.333 604.467 425.333C611.667 425.333 617.667 424.933 617.667 424.533C617.667 423.467 611.933 413.867 602.333 398.667C585.533 372.267 579 360.8 579.933 360C580.467 359.6 583.667 358 587 356.667C600.867 350.933 612.333 335.067 613.4 320.133C614.733 300.8 605.8 285.733 587 275.867C581.133 272.667 580.333 272.667 537.267 272.267C500.733 271.867 493.533 272.133 492.867 273.733Z"
                    fill="black"
                  />
                  <path
                    d="M707 273.333C707 274.133 710.2 282.4 714.2 291.733C718.2 301.067 726.6 320.667 732.867 335.2C739.133 349.867 743.933 362.267 743.533 362.8C743.267 363.333 732.467 363.867 719.667 364C700.467 364 696.2 363.733 695.533 362.133C695.133 361.067 696.6 356 698.867 350.933C701.133 345.733 703 341.2 703 340.8C703 340.4 697.133 340 689.933 340H677L663.8 370.933C644.867 415.333 641.667 423.067 641.667 424.267C641.667 424.8 647.533 425.333 654.733 425.333L667.667 425.2L675.133 406.933L682.6 388.667L718.867 388.267L755.133 388L757.133 392.933C758.333 395.733 760.067 399.733 761.133 402C762.067 404.133 764.6 410.133 766.733 415.333L770.6 424.667L783.533 425.067L796.6 425.467L795.667 421.733C794.867 418.267 786.467 398 773.667 368.667C770.867 362 763.267 344.4 756.867 329.333C750.6 314.267 742.467 295.333 739 287.333L732.733 272.667L719.8 272.267C711.133 272 707 272.4 707 273.333Z"
                    fill="black"
                  />
                  <path
                    d="M819 283.867V296H853C897 296 904.733 297.6 917.4 309.867C941.8 333.067 935.133 380.267 905.267 395.467C897 399.733 882.6 401.6 861 401.067L843.667 400.667L843 368.667L842.333 336.667H831H819.667L819.267 381.067L819 425.6L859.933 424.933C904.067 424.4 906.733 424 922.333 416.667C937.267 409.6 953 390.133 958.2 372.133C961.533 360.667 961.133 335.067 957.267 323.867C950.867 304.933 936.6 287.6 921.533 280.4C906.467 273.067 905.133 272.933 860.733 272.4L819 271.733V283.867Z"
                    fill="black"
                  />
                  <path
                    d="M983 284V296H1041.67H1100.33V284V272H1041.67H983V284Z"
                    fill="black"
                  />
                  <path
                    d="M397 321.6C396.6 322.533 396.467 346.133 396.6 374L397 424.667H408.333H419.667V372.667V320.667L408.6 320.267C400.6 320 397.4 320.4 397 321.6Z"
                    fill="black"
                  />
                  <path
                    d="M983 380.667V425.333H1041.67H1100.33V413.333V401.333L1054.07 401.067L1007.67 400.667V380.667V360.667L1054.07 360.267L1100.33 360V348V336H1041.67H983V380.667Z"
                    fill="black"
                  />
                </svg>
              </Logo>

              <Heading
                as="h4"
                weight="semiBold"
                padding={{
                  xs: { bottom: 1 },
                  sm: { bottom: 1 },
                  md: { bottom: 1 },
                }}
              >
                Welcome to Gradac Trade! 👋
              </Heading>

              <Heading
                as="h6"
                weight="medium"
                padding={{
                  xs: { bottom: 3 },
                  sm: { bottom: 3 },
                  md: { bottom: 4 },
                }}
              >
                Please sign-in to your account and start the adventure
              </Heading>

              <AlertBox {...{ errorMessage }} />

              <Formik
                autoComplete="off"
                initialValues={{
                  userName: "",
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={async (
                  values: Formvalues,
                  { setSubmitting }: FormikHelpers<Formvalues>
                ) => {
                  await signIn("credentials", {
                    userName: values.userName,
                    password: values.password,
                    redirect: false,
                  }).then(({ error }: any) => {
                    if (error === "Verification failed") {
                      setErrorMessage("Failed");
                    } else {
                      if (error) {
                        // Alert error
                        setErrorMessage(error);

                        // Disable submitting
                        setTimeout(() => {
                          setSubmitting(false);
                        }, 500);
                      } else {
                        // Set error to false
                        setErrorMessage("");

                        // Reroute user to the dashboard
                        router.push("/");
                      }
                    }
                  });
                }}
              >
                {({
                  values,
                  touched,
                  errors,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  handleBlur,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Group>
                      <Label>User name *</Label>
                      <Field
                        type="text"
                        name="userName"
                        placeholder="Enter your email or username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.userName}
                      />

                      {errors.userName && touched.userName ? (
                        <AlertBox errorMessage={errors.userName} />
                      ) : null}
                    </Group>

                    <Group>
                      <Label>Password *</Label>

                      <Password>
                        <Field
                          type={visiblePassword ? "text" : "password"}
                          name="password"
                          placeholder="*******"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />

                        <Icon
                          onClick={() => setVisiblePassword(!visiblePassword)}
                          $icon="toggle-eye"
                        />
                      </Password>

                      {errors.password && touched.password ? (
                        <AlertBox errorMessage={errors.password} />
                      ) : null}
                    </Group>

                    <Button
                      variant="secondary"
                      type="submit"
                      margin={{
                        xs: { top: 1 },
                        sm: { top: 1 },
                        md: { top: 1 },
                      }}
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? "Prijava..." : "Sign in"}
                    </Button>
                  </form>
                )}
              </Formik>
            </Wrap>
          </Column>
        </Row>
      </Container>
    </Login>
  );
};

export { index as Login };
