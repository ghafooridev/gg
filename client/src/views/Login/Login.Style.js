import { makeStyles } from "@material-ui/core/styles"

export const styles = makeStyles((theme) => ({
	textField: {
		width: "100%",
		[theme.breakpoints.down("xs")]: {
			width: "100% !important",
		},
	},
}))
