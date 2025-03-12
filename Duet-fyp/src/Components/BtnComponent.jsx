import { Button, CircularProgress } from "@mui/material";
import Colors from "../assets/Style";


function PrimaryButton(props) {
  return (
    <Button
      variant="contained"
      startIcon={props?.startIcon}
      endIcon={props?.endIcon}
      sx={{
        borderRadius: "8px",
        cursor:"pointer",
        background: props?.backgroundColor || Colors.PrimaryBlue,
        color: props?.color || "white",
        height: props?.height,
        textTransform: "capitalize",
        fontFamily: "Open Sans",
        fontSize: props?.fontSize || "16px",
        fontWeight: 500,
        width: props?.width,
        p: props?.padding || "5px 25px",
        paddingLeft:props?.paddingLeft || "",
        border: props?.border || `1px solid ${Colors.PrimaryBlue}`,
        ":hover": {
          background: Colors.PrimaryBlue,
          color: Colors.white,
        },
        "&.Mui-disabled": {
          background: Colors.PrimaryBlue,
          color: "white",
        },
        ...props.style,
      }}
      {...props}
      onClick={props?.handleFunction}
    >
      {props.loading ? (
        <CircularProgress
          size={24}
          sx={{
            color: "white",
            position: "absolute",
            marginLeft:props?.startIcon?"40px":"0px"
          }}
        />
      ) : (
        props?.title
      )}
    </Button>
  );
}

function SecondaryButton(props) {
  return (
    <Button
      variant={"outlined"}
      sx={{
        borderRadius: "8px",
        color: props?.color || Colors.white,
        textTransform: "capitalize",
        fontFamily: "Open Sans",
        fontSize: props?.fontSize || "16px",
        fontWeight: 500,
        height: props?.height,
        p: "5px 25px",
        width: props?.width,
        border: `1px solid ${props?.borderColor || Colors.lightGray}`,
        // ":hover": {
        //   background: Colors.red,
        //   color: Colors.white,
        // },
        "&.Mui-disabled": {
          background: Colors.red,
        },
        ...props.style,
      }}
      {...props}
      onClick={props?.handleFunction}
    >
      {props.title}
    </Button>
  );
}

export default PrimaryButton;
export { SecondaryButton };
