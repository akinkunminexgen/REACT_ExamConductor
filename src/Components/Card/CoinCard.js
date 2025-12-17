import React from 'react';
import {
    Card, CardHeader, CardBody, CardFooter,
    ListGroup, ListGroupItem, Button, ButtonGroup, DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown
} from "reactstrap";
import PropTypes from "prop-types";
import { isArray } from 'lodash';

function CoinCard(props) {

    const [dropdownOpen, setOpen] = React.useState(false);
    const toggle = () => setOpen(!dropdownOpen);

    const {
        icon,
        title,
        bodyText,
        action,
    } = props;

    return (
        <Card className="card-pricing card-coin no-transition mb-0" style={{ minHeight: "340px", marginTop: "65px" }}>
            <CardHeader>
                {icon}
            </CardHeader>
            <CardBody>
                <h5 className="text-uppercase text-center">{title}</h5>
                <hr className="bg-info"></hr>
                {bodyText && bodyText.length > 0 &&
                    <ListGroup>
                        {
                            bodyText.map((text, index) => <ListGroupItem key={index}>{text}</ListGroupItem>)
                        }
                    </ListGroup>
                }
            </CardBody>
            <CardFooter className="text-center bg-transparent pt-0">
                {
                    action.children && isArray(action.children) && action.children.length > 0
                        ? (
                            <ButtonGroup>
                                <Button className="mb-3" color="primary" onClick={action.onClick ? action.onClick : () => { }}>
                                    {action.title}
                                </Button>
                                <ButtonDropdown className="mb-3" isOpen={dropdownOpen} toggle={toggle} direction="up" >
                                    <DropdownToggle caret color="primary" />
                                    <DropdownMenu>
                                        {
                                            action.children.map(({ title, onClick }, index) => (
                                                <DropdownItem key={index} onClick={onClick ? onClick : () => { }}>{title}</DropdownItem>
                                            ))
                                        }
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </ButtonGroup>
                        ) : (
                            <Button className="mb-3" color="primary" onClick={action.onClick ? action.onClick : () => { }}>
                                {action.title}
                            </Button>
                        )
                }
            </CardFooter>
        </Card>
    )
}

CoinCard.propTypes = {
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.arrayOf(PropTypes.string).isRequired,
    action: PropTypes.exact({
        title: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        children: PropTypes.arrayOf(
            PropTypes.exact({
                title: PropTypes.string.isRequired,
                onClick: PropTypes.func
            })
        )
    }).isRequired,
}

export default CoinCard;